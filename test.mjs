console.log("Starting test.ts");
try {
    await import("./vite.config");
    console.log("Imported vite.config");
} catch (e) {
    console.error("Failed to import vite.config:", e);
}
