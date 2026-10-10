import { createRoot } from "react-dom/client"
import Header from "./Header"
const root= createRoot(document.getElementById("root"))
//render some markup to the root
root.render(<Page/>)
function Page(){
  return(
    <section>
    <Header/>
    <main>
    <h1>this why i love react</h1>
    <ol>
        <li>reason1</li>
        <li>reason2</li>
        <li>reason3</li>
    </ol>
    </main>
    <footer>n import quoi all rights reaserved</footer>
    </section>)
}
