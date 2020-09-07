const FragShader = `
  varying lowp vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;

export { FragShader };
