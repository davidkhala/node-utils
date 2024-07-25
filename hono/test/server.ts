import {Hono} from 'hono';
import {zValidator} from '@hono/zod-validator';
import {z} from 'zod';
import { serve } from '@hono/node-server'


const app = new Hono();

const route = app.get(
	'/hello',
	zValidator(
		'query',
		z.object({
			name: z.string(),
		})
	),
	(c) => {
		const {name} = c.req.valid('query');
		return c.json({
			message: `Hello! ${name}`,
		});
	}
);

app.get('/ping-json', (c) => {
	return c.json({
		message: 'pong!',
	});
});

export default app
serve(app)
export type AppType = typeof route

