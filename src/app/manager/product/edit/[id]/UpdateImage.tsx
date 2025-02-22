"use client";

import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const UpdateImage = () => {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteImage = (url: string, isCoverImage: boolean) => {
    // if (isCoverImage) {
    //   setCoverImage(null);
    // } else {
    //   setAdditionalImages((prev) => prev.filter((img) => img !== url));
    // }
  };

  return (
    <>
      <div className="border-b border-gray-900/10 pb-12 mt-8">
        <h2 className="text-base font-bold text-gray-900">
          Chỉnh sửa hình ảnh
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          Cập nhật ảnh chính và ảnh phụ cho sản phẩm.
        </p>

        <div className="mt-6">
          <div className="block text-sm font-medium text-gray-700">
            Ảnh chính
          </div>
          <div className="mt-2 flex items-center gap-4">
            {coverImage ? (
              <div className="relative">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-32 h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(coverImage, true)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="w-40 h-40 bg-slate-100 rounded flex items-center justify-center cursor-pointer hover:bg-slate-200"
                onClick={() => setIsOpen(true)}
              >
                <PhotoIcon className="w-8 h-8 text-gray-400" />
                <span className="text-sm/10 text-gray-600 ml-2">
                  Tải ảnh lên
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Update ảnh phụ */}
        <div className="mt-6">
          <div className="block text-sm font-medium text-gray-700">Ảnh phụ</div>
          <div className="mt-2 flex flex-wrap gap-4">
            {additionalImages.map((img, index) => (
              <div key={img} className="relative">
                <img
                  src={img}
                  alt={`Additional ${index + 1}`}
                  className="w-32 h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(img, false)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="w-40 h-40 bg-slate-100 rounded flex items-center justify-center cursor-pointer hover:bg-slate-200"
              onClick={() => setIsOpen(true)}
            >
              <PlusIcon className="w-8 h-8 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                Tải ảnh lên
              </Dialog.Title>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setIsOpen(false);
                  }
                }}
                className="mt-4"
              />
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UpdateImage;
