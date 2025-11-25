console.log("Starting test-config.ts");
try {
    await import("./vite.config");
    console.log("vite.config imported successfully");
} catch (e) {
    console.error("Failed to import vite.config");
    console.error(e);
    process.exit(1);
}
