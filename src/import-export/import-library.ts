import { decode } from "cborg";
import { dbPromise } from "../db";
import { currentPage, Page } from "../stores";
import { get } from "svelte/store";

/** Show an upload dialog and add the uploaded CBOR to the library */
export async function importLibrary() {
    let cbor = await uploadFile();
    let decoded = decode(new Uint8Array(cbor));

    let db = await dbPromise;
    let transaction = db.transaction("library", "readwrite");
    let store = transaction.objectStore("library");
    decoded.forEach((item) => {
        store.put(item);
    });

    if (get(currentPage) === Page.filePicker) {
        location.reload();
    }
}

/** Show a dialog for uploading a file and return it as an ArrayBuffer */
function uploadFile(): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = "application/cbor";

        input.oninput = () => {
            let reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as ArrayBuffer);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(input.files[0]);
        };
        input.onerror = reject;

        input.click();
    });
}
