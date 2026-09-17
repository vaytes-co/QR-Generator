document.addEventListener("DOMContentLoaded", () => {
    const urlInput = document.getElementById("urlInput");
    const imageInput = document.getElementById("imageInput");
    const generateBtn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const qrContainer = document.getElementById("qr-container");

    const qrCode = new QRCodeStyling({
        width: 280,
        height: 280,
        type: "svg",
        data: "",
        image: "",
        dotsOptions: {
            color: "#1e293b",
            type: "rounded"
        },
        backgroundOptions: {
            color: "#ffffff",
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

    generateBtn.addEventListener("click", () => {
        const url = urlInput.value.trim();
        
        if (!url) {
            alert("Harap masukkan link/URL terlebih dahulu.");
            return;
        }

        qrContainer.classList.remove("hidden");
        downloadBtn.classList.remove("hidden");
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

    function updateQRCode(url, imageUrl) {
        qrCode.update({
            data: url,
            image: imageUrl
        });
        qrCode.append(qrContainer);
    }

    downloadBtn.addEventListener("click", () => {
        qrCode.download({ name: "qr-code", extension: "png" });
    });
});