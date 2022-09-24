import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Loader } from "@googlemaps/js-api-loader";
import { apiOptions, getLocation } from "./api/location";

const mapOptions = {
  tilt: 45,
  heading: 0,
  zoom: 18,
  center: {
    lat: 0,
    lng: 0,
  },
  mapId: "a2a3477092a2f839",
};

const latLngAltitudeLiteral = {
  lat: 0,
  lng: 0,
  altitude: 0,
};

const accuracy = {
  horizontal: 0,
  vertical: 0,
};

async function initMap() {
  const mapDiv = document.getElementById("map");

  const apiLoader = new Loader(apiOptions);
  await apiLoader.load();

  return new google.maps.Map(mapDiv, mapOptions);
}

function initWebGLOverlayView(map) {
  let scene, renderer, camera, loader;

  const webGLOverlayView = new google.maps.WebGLOverlayView();
  webGLOverlayView.onAdd = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera();
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75); // soft white light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
    directionalLight.position.set(0.5, -1, 0.5);
    scene.add(directionalLight);

    loader = new GLTFLoader();
    const flat = "./assets/circle.gltf";
    loader.load(flat, (gltf) => {
      gltf.scene.scale.set(50, 50, 50);
      gltf.scene.rotation.x = (90 * Math.PI) / 180;
      scene.add(gltf.scene);
    });
    const sphere = "./assets/sphere.gltf";
    loader.load(sphere, (gltf) => {
      gltf.scene.scale.set(5, 5, 5);
      gltf.scene.rotation.x = (180 * Math.PI) / 180;
      scene.add(gltf.scene);
    });
    const arrow = "./assets/arrow.gltf";
    loader.load(arrow, (gltf) => {
      gltf.scene.scale.set(10, 10, 10);
      gltf.scene.rotation.x = (90 * Math.PI) / 180;
      scene.add(gltf.scene);
    });
  };
  webGLOverlayView.onContextRestored = ({ gl }) => {
    renderer = new THREE.WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      ...gl.getContextAttributes(),
    });

    renderer.autoClear = false;

    loader.manager.onLoad = () => {
      renderer.setAnimationLoop(() => {
        map.moveCamera({
          tilt: mapOptions.tilt,
          heading: mapOptions.heading,
          zoom: mapOptions.zoom,
        });
        if (mapOptions.tilt < 67.5) {
          mapOptions.tilt += 0.5;
        } else if (mapOptions.heading <= 360) {
          mapOptions.heading += 0.2;
        } else {
          renderer.setAnimationLoop(null);
        }
      });
    };
  };
  webGLOverlayView.onDraw = ({ gl, transformer }) => {
    const matrix = transformer.fromLatLngAltitude(latLngAltitudeLiteral);
    camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);

    webGLOverlayView.requestRedraw();
    renderer.render(scene, camera);
    renderer.resetState();
  };
  webGLOverlayView.setMap(map);
}

(async () => {
  const location = await getLocation("Adam");

  mapOptions.center.lat = latLngAltitudeLiteral.lat = location.latitude;
  mapOptions.center.lng = latLngAltitudeLiteral.lng = location.longitude;
  latLngAltitudeLiteral.altitude = location.altitude;

  accuracy.horizontal = location.horizontalAccuracy;
  accuracy.vertical = location.verticalAccuracy;

  const map = await initMap();
  initWebGLOverlayView(map);
})();
