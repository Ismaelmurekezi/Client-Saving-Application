export const generateDeviceId = (): string => {
  if (typeof window === "undefined") {
    return "server-side-fallback";
  }

  // Check if device ID already exists in localStorage
  const existingDeviceId = localStorage.getItem("deviceId");
  if (existingDeviceId) {
    return existingDeviceId;
  }

  // Generate a simple device ID using browser characteristics
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx?.fillText("Device fingerprint", 10, 10);
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
    Date.now().toString(),
    Math.random().toString(36)
  ].join("|");

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  const deviceId = `device_${Math.abs(hash).toString(36)}_${Date.now().toString(36)}`;
  
  // Store in localStorage for consistency
  localStorage.setItem("deviceId", deviceId);
  
  return deviceId;
};
