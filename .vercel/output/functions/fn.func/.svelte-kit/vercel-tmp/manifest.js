export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["aw3ra_an_singular_circle_emblem_for_an_AI_chat_app_gradient_vec_7c7fe9e9-b670-4052-b163-db1a57f2e169.png","background1.jpg","favicon.png"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.Eo3dDeca.js","app":"_app/immutable/entry/app.yKff2rXy.js","imports":["_app/immutable/entry/start.Eo3dDeca.js","_app/immutable/chunks/entry.W-CZ1GPE.js","_app/immutable/chunks/scheduler.BnSwxYe-.js","_app/immutable/chunks/index.Ua9e-3Rz.js","_app/immutable/entry/app.yKff2rXy.js","_app/immutable/chunks/preload-helper.0HuHagjb.js","_app/immutable/chunks/scheduler.BnSwxYe-.js","_app/immutable/chunks/index.ikIDff96.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":true},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/database/conversations/create",
				pattern: /^\/api\/database\/conversations\/create\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/database/conversations/create/_server.ts.js'))
			},
			{
				id: "/api/database/user/create",
				pattern: /^\/api\/database\/user\/create\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/database/user/create/_server.ts.js'))
			},
			{
				id: "/api/database/user/find",
				pattern: /^\/api\/database\/user\/find\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/database/user/find/_server.ts.js'))
			},
			{
				id: "/api/database/user/update",
				pattern: /^\/api\/database\/user\/update\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/database/user/update/_server.ts.js'))
			},
			{
				id: "/api/openai/fetchConvo",
				pattern: /^\/api\/openai\/fetchConvo\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/openai/fetchConvo/_server.ts.js'))
			},
			{
				id: "/api/openai/sendMessage",
				pattern: /^\/api\/openai\/sendMessage\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/openai/sendMessage/_server.ts.js'))
			},
			{
				id: "/api/solana/create-message",
				pattern: /^\/api\/solana\/create-message\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/solana/create-message/_server.ts.js'))
			},
			{
				id: "/api/solana/create-transaction",
				pattern: /^\/api\/solana\/create-transaction\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/solana/create-transaction/_server.ts.js'))
			},
			{
				id: "/api/solana/verify-message",
				pattern: /^\/api\/solana\/verify-message\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/solana/verify-message/_server.ts.js'))
			},
			{
				id: "/home",
				pattern: /^\/home\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
