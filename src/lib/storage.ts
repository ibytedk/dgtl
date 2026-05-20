export type StorageConfig = {
  endpoint: string;
  region: string;
  bucket: string;
};

export function getStorageConfig(): StorageConfig {
  return {
    endpoint: process.env.S3_ENDPOINT ?? "",
    region: process.env.S3_REGION ?? "eu-north-1",
    bucket: process.env.S3_BUCKET ?? ""
  };
}

export function buildStorageKey(prefix: string, fileName: string) {
  const safeFileName = fileName
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${prefix.replace(/\/$/, "")}/${Date.now()}-${safeFileName}`;
}

export function publicDownloadUrl(storageKey: string) {
  const config = getStorageConfig();

  if (!config.endpoint || !config.bucket) {
    return `/api/files/${encodeURIComponent(storageKey)}`;
  }

  return `${config.endpoint.replace(/\/$/, "")}/${config.bucket}/${storageKey}`;
}
