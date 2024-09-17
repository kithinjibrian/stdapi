// cSpell: disable

import { defineStore } from 'pinia'

export const useFileStore = defineStore('file', {
    state: () => ({
        files: null,
    }),
    getters: {
        get_file: (state) => {

            return (id) => {

                const find_file = (items) => {

                    for (let file of items) {
                        if (file.id === id) return file;
                        if ('children' in file) {
                            const found = find_file(file.children)
                            if (found) return found;
                        }
                    }

                    return null;
                }

                return find_file(state.files);
            }
        }
    },
    actions: {
        set_file(file) {
            this.files = file;
        },
        update_buffer(file, buffer) {
            Object.assign(file, { buffer: buffer });
        },
        fetch_files() {
            fetch("http://127.0.0.1:8000/api/v1/files/", {
                method: "GET",
            })
                .then(res => res.json())
                .then(data => {
                    this.set_file(data);
                })
        },
        async fetch_file(file) {

            return fetch("http://127.0.0.1:8000/api/v1/get_file/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ path: file.full_path }),
            })
                .then(res => res.json())
                .then(data => {
                    file.children = data;
                })
        },
        fetch_file_content(file) {
            const self = this;
            return new Promise((resolve, reject) => {

                fetch("http://127.0.0.1:8000/api/v1/get_file_content/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ path: file.full_path }),
                })
                    .then(res => {
                        const contentType = res.headers.get('Content-Type');
                        if (contentType.includes('application/octet-stream')) {
                            res.blob().then(blob => console.log(blob));
                        } else if (contentType.includes('text')) {
                            res.text().then(text => {
                                self.update_buffer(file, text);
                                resolve(text);
                            });
                        }
                    })
            })
        }
    }
})