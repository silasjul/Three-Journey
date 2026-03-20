uniform float lineWidth;
uniform float radius;
uniform float frequency;
uniform float amplitude;
uniform float colorTweak;
uniform float enableColor;

varying vec2 vUv;

void main()
{
    // Drawing
    vec2 center = vec2(0.5);

    vec2 wavedUv = vec2(
        vUv.x + sin(vUv.y * frequency) * amplitude,
        vUv.y + cos(vUv.x * frequency) * amplitude
    );

    float strength = 1.0 - step(lineWidth, abs(distance(wavedUv, center) - radius));

    // Color
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, colorTweak);
    vec3 mixedColor = mix(blackColor, uvColor, strength);
    vec3 strengthOnly = vec3(strength);
    vec3 outColor = mix(strengthOnly, mixedColor, enableColor);

    gl_FragColor = vec4(outColor, 1.0);
}