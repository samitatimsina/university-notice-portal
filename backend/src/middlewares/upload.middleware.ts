import multer from "multer";
import path from "path";
import fs from "fs";

// Save to Downloads folder
const uploadDir = path.join(process.cwd(), "uploads", "notices");

// Create folder if missing
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, uploadDir);
    },

    filename(req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }

});

const fileFilter: multer.Options["fileFilter"] = (
    req,
    file,
    cb
) => {

    const allowedTypes = [

        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",

        "application/pdf"

    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only PDF and Image files are allowed."
            )
        );

    }

};

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 10 * 1024 * 1024

    }

});

export default upload;