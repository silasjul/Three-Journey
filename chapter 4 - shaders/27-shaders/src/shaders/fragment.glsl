uniform vec3 uColor;
uniform sampler2D uTexture;
uniform vec2 uElevation;

varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * uElevation.x + uElevation.y;
    gl_FragColor = textureColor;
}