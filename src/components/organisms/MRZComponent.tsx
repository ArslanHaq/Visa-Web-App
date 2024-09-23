'use client';
import { useEffect, useState } from "react";

declare global {
    interface Window {
        mrz_worker: any; // Adjust the type as per your actual `mrz_worker` object
    }
}

export default function MRZComponent() {
    const [worker, setWorker] = useState<Worker | null>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/mrz-scanner-master/dist/js/mrz-worker.bundle-min-wrapped.js'; // Correct path
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const initializedWorker = initWorker();
            setWorker(initializedWorker);
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!worker) return; // Ensure the worker is initialized

        const reader = new FileReader();
        reader.onload = function (event: any) {
            worker.postMessage({
                cmd: 'process',
                image: event.target.result,
            });
        };

        if (e.target.files?.length) {
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="flex h-svh justify-center items-center">
            <input type="file" accept="image/*" id="photo" onChange={handleFileChange} />

            <div id="mrz-data">


            </div>
        </div>
    );
}

function initWorker() {
    if (!window.mrz_worker) {
        console.error("mrz_worker is not defined");
        return null;
    }

    const blob = new Blob(
        [window.mrz_worker.toString().replace(/^function .+\{?|\}$/g, '')],
        { type: 'text/javascript' }
    );
    const objectURL = URL.createObjectURL(blob);
    const worker = new Worker(objectURL);

    worker.addEventListener('message', async function (e) {
        console.log('here is e', e.data);
        var data = e.data;

        if (data.type === 'result') {

            console.log('result', data.result);
            // if (data.result.parsed.valid) {
            let parsed = data.result.parsed.fields;
            let html = '';
            await Object.keys(parsed).forEach((field: any, index: any) => {

                html += `
                    <div class="flex flex-col">
                        <span>
                        ${field} : ${parsed[field]}
                        </span>
                    </div>
                    `
            });

            let mrz_data_element = document.getElementById('mrz-data');
            if (mrz_data_element) {
                mrz_data_element.innerHTML = html;
            }
            // }
        }
        // else if (data.type === 'progress') {
        //     console.log('progress');
        // }
        else if (data.type === 'error') {
            console.log('error', data.error);
        }
        return worker
    });

    return worker;
}
