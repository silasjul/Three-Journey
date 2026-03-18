uniform vec2 uSinFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * uSinFrequency.x - uTime) * 0.1;
    modelPosition.z += sin(modelPosition.y * uSinFrequency.y - uTime) * 0.1;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    vUv = uv;
    vElevation = modelPosition.z;
}