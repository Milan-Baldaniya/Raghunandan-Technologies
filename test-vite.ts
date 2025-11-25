console.log("Starting test-vite.ts");
try {
    const vite = await import("vite");
    console.log("Vite imported successfully");
} catch (e) {
    console.error("Failed to import vite");
    console.error(e);
    process.exit(1);
}
