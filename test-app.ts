console.log("Starting test-app.ts");
try {
    await import("./server/app");
    console.log("server/app imported successfully");
} catch (e) {
    console.error("Failed to import server/app");
    console.error(e);
    process.exit(1);
}
