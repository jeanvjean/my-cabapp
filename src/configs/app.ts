class App {
	public static appName = 'boiler'

	public static port = parseInt(`${process.env.PORT}` || '3200')

	public static env = `${process.env.NODE_ENV}` || 'development'

	static clientBodyLimit = '50mb'
}

export default App;
