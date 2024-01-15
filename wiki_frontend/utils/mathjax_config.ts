// export const mathjax_config = {
//   loader: { load: ["[tex]/html"] },
//   tex: {
//     packages: { "[+]": ["html"] },
//     inlineMath: [
//       ["$", "$"],
//       ["\\(", "\\)"]
//     ],
//     displayMath: [
//       ["$$", "$$"],
//       ["\\[", "\\]"]
//     ]
//   }
// };
export const mathjax_config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ],
    // 添加 env 配置项
    env: {
      packages: { "[+]": ["html"] },
      processEscapes: true,
      processEnvironments: true,
      // 支持 begin 和 end
      processRefs: true,
      // 添加支持的环境，这里示例添加了 align 环境
      // 你可以根据需要添加其他环境
      environments: {
        align: ["AMSmath"],
        "align*": ["AMSmath"]
      }
    }
  }
};
