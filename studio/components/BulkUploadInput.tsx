import { Button, Card, Flex, Text } from "@sanity/ui";
import { UploadIcon } from "@sanity/icons/Upload";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { insert, setIfMissing, useClient } from "sanity";
import type { ArrayOfObjectsInputProps } from "sanity";
import { apiVersion } from "../env";

const BATCH_SIZE = 5;

type BulkUploadConfig = {
  label: string;
  toItem: (assetId: string, file: File, key: string) => Record<string, unknown>;
};

function uniqueKey() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

function chunk<T>(items: T[], size: number) {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  );
}

function nameFromFile(file: File) {
  return file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function imageReference(assetId: string) {
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

export function createBulkUploadInput({ label, toItem }: BulkUploadConfig) {
  return function BulkUploadInput(props: ArrayOfObjectsInputProps) {
    const client = useClient({ apiVersion });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
    const [failed, setFailed] = useState<string[]>([]);

    const uploadFiles = async (files: File[]) => {
      setFailed([]);
      setProgress({ done: 0, total: files.length });
      props.onChange(setIfMissing([]));
      let done = 0;
      for (const batch of chunk(files, BATCH_SIZE)) {
        const results = await Promise.allSettled(
          batch.map((file) => client.assets.upload("image", file, { filename: file.name })),
        );
        const items = results.flatMap((result, index) =>
          result.status === "fulfilled" ? [toItem(result.value._id, batch[index], uniqueKey())] : [],
        );
        const failedNames = results.flatMap((result, index) =>
          result.status === "rejected" ? [batch[index].name] : [],
        );
        if (items.length > 0) props.onChange(insert(items, "after", [-1]));
        if (failedNames.length > 0) setFailed((current) => [...current, ...failedNames]);
        done += batch.length;
        setProgress({ done, total: files.length });
      }
      setProgress(null);
    };

    const onFilesChosen = (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.currentTarget.files ?? []);
      event.currentTarget.value = "";
      if (files.length > 0) void uploadFiles(files);
    };

    return (
      <Flex direction="column" gap={3}>
        {props.renderDefault(props)}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={onFilesChosen}
        />
        <Button
          icon={UploadIcon}
          mode="ghost"
          text={progress ? `Uploading ${progress.done} / ${progress.total}…` : label}
          disabled={progress !== null || props.readOnly}
          onClick={() => fileInputRef.current?.click()}
        />
        {failed.length > 0 && (
          <Card tone="critical" padding={3} radius={2}>
            <Text size={1}>Couldn’t upload: {failed.join(", ")}</Text>
          </Card>
        )}
      </Flex>
    );
  };
}

export const PhotosBulkUploadInput = createBulkUploadInput({
  label: "Upload multiple photos",
  toItem: (assetId, _file, key) => ({
    _type: "photo",
    _key: key,
    image: imageReference(assetId),
  }),
});

export const LogosBulkUploadInput = createBulkUploadInput({
  label: "Upload multiple logos",
  toItem: (assetId, file, key) => ({
    _type: "clientLogo",
    _key: key,
    logo: imageReference(assetId),
    name: nameFromFile(file),
  }),
});
