export const wrapExec = (exec: () => Promise<void>) => {
	exec()
		.then(() => {
			process.exit(0)
		})
		.catch((reason) => {
			console.error(reason)
			process.exit(1)
		})
}
