import { encode } from "cborg";
import { dbPromise } from "../db";

/** Download the library as a CBOR file */
export async function exportLibrary() {
    let db = await dbPromise;
    let libraryData = await db.getAll("library");
    let encoded = encode(libraryData);

    let blob = new Blob([encoded], { type: "application/cbor" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = generateFilename();
    a.click();

    URL.revokeObjectURL(url);
}

/** Generate a filename for the library export */
function generateFilename() {
    let dateObj = new Date();
    let year = String(dateObj.getFullYear());
    let month = String(dateObj.getMonth()).padStart(2, "0");
    let date = String(dateObj.getDate()).padStart(2, "0");

    let hour = String(dateObj.getHours()).padStart(2, "0");
    let minute = String(dateObj.getMinutes()).padStart(2, "0");
    let second = String(dateObj.getSeconds()).padStart(2, "0");

    return `audio-extender-export-${year}${month}${date}-${hour}${minute}${second}.cbor`;
}
