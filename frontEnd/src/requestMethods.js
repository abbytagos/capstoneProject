import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTc3YTM4ZjE3ZDNmNTQ4MmViOWViNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3OTM3Mjg0MSwiZXhwIjoxNjc5NjMyMDQxfQ.4ZuaCAiF0y-bKa4dFNI3vNcmlnXZhTUrkzZbWq1-HLM"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});