import httpRequest from "@/utils/httpRequest";

export async function getUsers() {
  return httpRequest.get("/users");
}
