import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from '@tauri-apps/api/window'
import { writeText} from '@tauri-apps/api/clipboard';

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document
    .querySelector("#greet-button")
    ?.addEventListener("click", () => greet());

  document.getElementById('titlebar-close')?.addEventListener('click', () => appWindow.close())
  const gitmojis = document.getElementsByTagName('button')
  const buttons = Array.from(gitmojis)
  buttons.forEach((b) => {
    b.addEventListener('click', copyGitmojis)
  })
});

async function copyGitmojis(e:any){
  const x:HTMLInputElement = document?.getElementById("task") as HTMLInputElement
  await writeText(e?.target?.innerText + " " + x?.value + " - ")
}