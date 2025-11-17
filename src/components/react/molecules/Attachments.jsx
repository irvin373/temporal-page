import Label from "../atoms/Label";
import FileInput from "../atoms/FileInput";
import React from "react";

export default function Attachments({ resumeRef }) {
    return (
        <div className="attachments">
            <div className="resume-upload">
                <Label htmlFor="resumeUpload">Upload Résumé</Label>
                <FileInput
                    id="resumeUpload"
                    name="resumeUpload"
                    accept=".pdf,.doc,.docx"
                    ref={resumeRef}
                />
            </div>
        </div>
    )
}