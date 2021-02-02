import App from './App.svelte';
import { LuaFactory } from 'wasmoon';
import wasmFile from 'wasmoon/dist/glue.wasm';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

(async () => {
	
	const lua = await new LuaFactory(wasmFile).createEngine();

	try {
		lua.global.set('sum', (x, y) => x + y);
		lua.doString(`
		print(sum(10, 10))
		function multiply(x, y)
			return x * y
		end
		`);
		const multiply = lua.global.get('multiply');
		console.log(multiply(10, 10))
	} finally {
		lua.global.close();
	}

})();

export default app;