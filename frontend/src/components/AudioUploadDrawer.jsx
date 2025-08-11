"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FileUploader } from "react-drag-drop-files";
import { UploadCloud } from "lucide-react"; // Loader2 is no longer needed here

const fileTypes = ["MP3", "WAV", "M4A"];

const UploadDrawer = ({ handleFileChange, handleUpload, loading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (file) => {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (!fileTypes.includes(ext.toUpperCase())) {
      toast.error("Unsupported file type. Please upload .mp3, .wav, or .m4a.");
      return;
    }
    setSelectedFile(file);
    const fakeEvent = { target: { files: [file] } };
    handleFileChange(fakeEvent);
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }
    setIsOpen(false); // Close the drawer immediately
    await handleUpload();
  };

  // 👇 The conditional logic for loading has been removed from here
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-zinc-600 text-gray-200 hover:text-white border border-zinc-700 hover:bg-zinc-700 transition-all duration-200 rounded-lg px-5 py-2 shadow-sm"
          onClick={() => setIsOpen(true)}
          disabled={loading} // Disable button while processing
        >
          <UploadCloud className="mr-2 h-5 w-5" />
          {loading ? "Processing..." : "Upload Audio"}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="rounded-t-2xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-white shadow-xl">
        <div className="mx-auto w-full max-w-md text-center px-4 pb-6">
          <DrawerHeader>
            <DrawerTitle className="text-lg font-semibold text-white">
              Upload Your Audio File
            </DrawerTitle>
            <DrawerDescription className="text-sm text-zinc-400">
              Choose an audio file to transcribe (MP3, WAV, M4A)
            </DrawerDescription>
          </DrawerHeader>

          <div className="py-4 space-y-4">
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              multiple={false}
              label="Click or drag to upload"
              classes="border border-dashed border-zinc-600 bg-zinc-800 text-white p-4 rounded-md hover:bg-zinc-700 transition"
            />
            <p className="text-sm text-zinc-300 font-mono">
              {selectedFile
                ? `Selected: ${selectedFile.name}`
                : "No file selected"}
            </p>
            <Button
              variant="outline"
              onClick={handleUploadClick}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium tracking-wide rounded-md py-2 transition-all disabled:opacity-50"
              disabled={!selectedFile}
            >
              Transcribe & Analyze
            </Button>
          </div>

          <DrawerFooter className="pt-3">
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="w-full bg-zinc-800 hover:bg-zinc-600 text-gray-400 hover:text-white font-medium tracking-wide rounded-md py-2 transition-all"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UploadDrawer;
