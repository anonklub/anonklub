pragma circom 2.0.2;

include "node_modules/circom-ecdsa/circuits/ecdsa.circom";

// Checks pubkey is a valid public key by making sure its points are on the curve and that nQ = 0.
// Algorithm from Johnson et al https://doi.org/10.1007/s102070100002 section 6.2
template ECDSACheckPubKey(n, k) {
    assert(n == 64 && k == 4);
    signal input pubkey[2][k];

    // Checks coordinates are in the base field, that Q is on the curve, and that Q != 0
    component point_on_curve = Secp256k1PointOnCurve();
    for (var i = 0; i < 4; i++) {
        point_on_curve.x[i] <== pubkey[0][i];
        point_on_curve.y[i] <== pubkey[1][i];
    }

    // We don't represent 0 as an actual point so we can't directly check that nQ = 0
    // Instead we check that (n - 2)Q = 2(-Q)
    // Note that we can't use (n - 1)Q = -Q since the double and add circuit implicitly tries to calculate nQ and errors
    var order_minus_one[100] = get_secp256k1_order(n, k);
    order_minus_one[0] -= 2;

    component lhs = Secp256k1ScalarMult(n, k);
    for (var i = 0; i < k; i++) {
        lhs.scalar[i] <== order_minus_one[i];
    }
    for (var i = 0; i < k; i++) {
        lhs.point[0][i] <== pubkey[0][i];
        lhs.point[1][i] <== pubkey[1][i];
    }

    // Check each coordinate of our equality independently.
    // Note: Q = (x, y) => -Q = (x, -y)
    // So we can check the x coordinate with [(n-1)*Q].x = Q.x,

    // Because -y === p - y mod p,
    //  we can check the y coordinate with [(n-1)*Q].y = p - Q.y
    var prime[100] = get_secp256k1_prime(n, k);
    component negative_y = BigSub(n, k);
    for (var i = 0; i < k; i++) {
        negative_y.a[i] <== prime[i];
        negative_y.b[i] <== pubkey[1][i];
    }
    negative_y.underflow === 0;

    component rhs = Secp256k1Double(n, k);
    for (var i = 0; i < k; i++) {
        rhs.in[0][i] <== pubkey[0][i];
        rhs.in[1][i] <== negative_y.out[i];
    }

    for (var i = 0; i < k; i++) {
        lhs.out[0][i] === rhs.out[0][i];
        lhs.out[1][i] === rhs.out[1][i];
    }
}
