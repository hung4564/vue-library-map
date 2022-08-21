let positionUser;
export async function getLocation() {
  return new Promise((resolve, reject) => {
    checkGeolocationSupport().then((res) => {
      if (!res) {
        reject(new Error("Not support get geocode"));
        return;
      }
      if (positionUser !== undefined) {
        resolve(positionUser);
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          positionUser = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          resolve(positionUser);
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true }
      );
    });
  });
}

let supportsGeolocation;
export async function checkGeolocationSupport() {
  if (supportsGeolocation !== undefined) {
    return supportsGeolocation;
  } else if (window.navigator.permissions !== undefined) {
    // navigator.permissions has incomplete browser support
    // http://caniuse.com/#feat=permissions-api
    // Test for the case where a browser disables Geolocation because of an
    // insecure origin
    return window.navigator.permissions
      .query({ name: "geolocation" })
      .then((p) => {
        supportsGeolocation = p.state !== "denied";
        return supportsGeolocation;
      });
  } else {
    supportsGeolocation = !!window.navigator.geolocation;
    return supportsGeolocation;
  }
}
checkGeolocationSupport();
