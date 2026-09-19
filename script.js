document.addEventListener("DOMContentLoaded", () => {
    const urlInput = document.getElementById("urlInput");
    const imageInput = document.getElementById("imageInput");
    const generateBtn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const qrContainer = document.getElementById("qr-container");

    // ==========================================
    // UKURAN QR
    // ==========================================

    // Ukuran QR yang tampil di website
    const PREVIEW_SIZE = 280;

    // Ukuran QR untuk hasil download
    const DOWNLOAD_SIZE = 4000;


    // ==========================================
    // QR UNTUK PREVIEW
    // ==========================================

    const previewQR = new QRCodeStyling({
        width: PREVIEW_SIZE,
        height: PREVIEW_SIZE,
        type: "svg",
        data: "",
        image: "",

        dotsOptions: {
            color: "#1e293b",
            type: "rounded"
        },

        backgroundOptions: {
            color: "#ffffff"
        },

        imageOptions: {
            crossOrigin: "anonymous",
            margin: 6,
            imageSize: 0.35
        },

        cornersSquareOptions: {
            type: "extra-rounded"
        }
    });


    // ==========================================
    // QR UNTUK DOWNLOAD HD
    // ==========================================

    const downloadQR = new QRCodeStyling({
        width: DOWNLOAD_SIZE,
        height: DOWNLOAD_SIZE,
        type: "svg",
        data: "",
        image: "",

        dotsOptions: {
            color: "#1e293b",
            type: "rounded"
        },

        backgroundOptions: {
            color: "#ffffff"
        },

        imageOptions: {
            crossOrigin: "anonymous",

            // Margin disesuaikan dengan ukuran 4000px
            margin: 30,

            imageSize: 0.35
        },

        cornersSquareOptions: {
            type: "extra-rounded"
        }
    });


    // ==========================================
    // GENERATE QR
    // ==========================================

    generateBtn.addEventListener("click", () => {

        const url = urlInput.value.trim();

        if (!url) {
            alert("Harap masukkan link/URL terlebih dahulu.");
            return;
        }

        qrContainer.classList.remove("hidden");
        downloadBtn.classList.remove("hidden");

        // Bersihkan preview sebelumnya
        qrContainer.innerHTML = "";

        const file = imageInput.files[0];

        if (file) {

            const reader = new FileReader();

            reader.onload = (e) => {
                updateQRCode(url, e.target.result);
            };

            reader.readAsDataURL(file);

        } else {

            updateQRCode(url, "");

        }
    });


    // ==========================================
    // UPDATE QR
    // ==========================================

    function updateQRCode(url, imageUrl) {

        // Update QR Preview
        previewQR.update({
            data: url,
            image: imageUrl
        });

        // Update QR Download
        downloadQR.update({
            data: url,
            image: imageUrl
        });


        // Tampilkan QR Preview
        previewQR.append(qrContainer);


        // Pastikan ukuran preview tetap 280px
        const svg = qrContainer.querySelector("svg");

        if (svg) {
            svg.style.width = "280px";
            svg.style.height = "280px";
            svg.style.maxWidth = "280px";
            svg.style.maxHeight = "280px";
            svg.style.display = "block";
        }
    }


    // ==========================================
    // DOWNLOAD SUPER HD
    // ==========================================

    downloadBtn.addEventListener("click", async () => {

        try {

            await downloadQR.download({
                name: "qr-code-super-hd",
                extension: "png"
            });

        } catch (error) {

            console.error("Gagal mengunduh QR Code:", error);

            alert("Gagal mengunduh QR Code.");

        }
    });

});