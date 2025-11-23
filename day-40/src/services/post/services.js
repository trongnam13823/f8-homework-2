import httpRequest from "@/utils/httpRequest";

export async function getPosts() {
  return httpRequest.get("/posts");
}
