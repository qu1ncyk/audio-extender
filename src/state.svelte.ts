export enum Page {
    filePicker,
    library,
    extender,
}

export let globalState = $state({
    currentPage: Page.filePicker,
    file: new ArrayBuffer(0),
    duration: 0,
    loopStart: 0,
    loopEnd: 0,
    audioBuffer: new AudioBuffer({ length: 1, sampleRate: 8e4 }),
    filename: "",
    storedInLibrary: false,
    isLibraryEmpty: true,
});
