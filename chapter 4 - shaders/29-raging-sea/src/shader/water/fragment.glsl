uniform vec3 surfaceColor;
uniform vec3 depthColor;
uniform float colorMultiplier;
uniform float colorOffset;

varying float vElevation;

void main() {
    vec3 color = mix(depthColor, surfaceColor, (vElevation + colorOffset) * colorMultiplier);

    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
}