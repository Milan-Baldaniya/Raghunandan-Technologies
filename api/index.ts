import { app, registerServices } from "../server/app";

let initialized = false;

export default async function handler(req, res) {
    if (!initialized) {
        await registerServices(app);
        initialized = true;
    }
    app(req, res);
}
