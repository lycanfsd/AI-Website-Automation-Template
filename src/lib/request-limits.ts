export function isRequestBodyTooLarge(request: Request, maxBytes: number) {
  const contentLength = request.headers.get("content-length");

  if (!contentLength) {
    return false;
  }

  const byteLength = Number(contentLength);

  return Number.isFinite(byteLength) && byteLength > maxBytes;
}
