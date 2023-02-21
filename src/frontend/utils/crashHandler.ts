export function handleTermination(err: any) {
  console.error(err);
  const messages = [
    `${err}`,
    `应用遇到了一些错误，我们对此带来的不便深表歉意。`,
    `The APP has encountered some errors. We apologize for the inconvenience.`,
  ];

  document.body.appendChild(
    (() => {
      let node = document.createElement('div');
      for (const message of messages) {
        node.appendChild(
          (() => {
            let node = document.createElement('div');
            node.innerText = message;
            node.style.cssText = 'font-size: 32px; text-align: center;';
            return node;
          })()
        );
      }
      node.style.cssText =
        'position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; box-sizing: border-box; padding: 64px; background: black; color: white; opacity: 0.8; display: flex; flex-direction: column; align-items: center; justify-content: center;';
      return node;
    })()
  );
}
