import React, { useEffect, useState } from "react";
import { api } from "./config.js";
import Navbar from "./Navbar.jsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const programeri = [
  { mbr: 50672, ime: "Marko Filipović" },
  { mbr: 48298, ime: "Marko Mišić" },
  { mbr: 49988, ime: "Aleksandar Mitrović" },
  { mbr: 48561, ime: "Stefan Živojinović" },
  { mbr: 48563, ime: "Radovan Gigić" },
  { mbr: 47997, ime: "Miloš Dučić" },
  { mbr: 48078, ime: "Andrija Novković" },
];

const trpezarije = [
  { mail: "trpezarijakapitalna@hbisserbia.rs", ime: "Kapitalna" },
  { mail: "trpezarijatopionica@hbisserbia.rs", ime: "Topionica" },
];

const vremena = ["09:30", "09:45", "10:00", "10:15", "10:30"];

function App() {
  const [pocetniData, setPocetniData] = useState();
  const [rezervacija, setRezervacija] = useState({
    ime: "",
    mbr: "",
    jelo: "",
    dan: "",
    vreme: "",
  });
  const [rezervacije, setRezervacije] = useState([]);
  const [trpezarija, setTrpezarija] = useState({
    email: "trpezarijakapitalna@hbisserbia.rs",
  });

  const obrociZaDan =
    pocetniData?.find((item) => item.dan === rezervacija.dan)?.topli_obroci ||
    [];

  useEffect(() => {
    api()
      .get("/data")
      .then((res) => setPocetniData(res.data));
  }, []);

  console.log(pocetniData);
  console.log(trpezarija);

  const unesiRezervaciju = () => {
    if (
      !rezervacija.ime ||
      !rezervacija.mbr ||
      !rezervacija.jelo ||
      !rezervacija.dan ||
      !rezervacija.vreme
    ) {
      alert("Sva polja moraju biti popunjena!");
      return;
    }
    setRezervacije((prevRezervacija) => [...prevRezervacija, rezervacija]);
    setRezervacija({
      ime: "",
      mbr: "",
      jelo: "",
      dan: "",
      vreme: "",
    });

    console.log(rezervacije);
  };

  const posaljiRezervaciju = () => {
    if (rezervacije.length === 0) {
      MySwal.fire({
        icon: "error",
        title: "Nema rezervacija za slanje!",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    api()
      .post("/posalji", { narudzbe: rezervacije, email: trpezarija })
      .then((res) => {
        if (res.status === 200) {
          MySwal.fire({
            icon: "success",
            title: "Uspesno ste poslali rezervaciju!",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          title: "Greska prilikom slanja rezervacije!",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return (
    <>
      <Navbar />
      {/* bg-gradient-to-r from-indigo-400 to-cyan-400 */}
      <main
        style={{
          background: "rgb(156,255,0)",
          background:
            "radial-gradient(circle, rgba(156,255,0,1) 0%, rgba(28,38,60,1) 60%)",
        }}
        className="flex min-h-screen py-28 px-10 flex-row gap-7 text-2xl bg-gradient-to-tl from-lime-400 from-0% via-[#313c53] via-30% to-[#1c263c] to-70%"
      >
        {" "}
        {/* bg-[#1c263c] */}
        <form
          //onSubmit={handleSubmit}
          className="flex flex-col min-w-[30%] gap-4 xl:text-2xl text-[#b6c0d2] font-semibold"
        >
          <div className="flex flex-col w-full gap-2">
            <label>Programeri:</label>
            <select
              className="shadow-xl shadow-[#1c263c] text-[#b6c0d2] p-1 bg-[#313c53] border-[#9cff00] border-2 rounded-lg"
              name="ime"
              id="ime"
              value={rezervacija.ime}
              onChange={(e) =>
                setRezervacija({
                  ...rezervacija,
                  ime: e.target.value,
                  mbr: programeri.find((opt) => opt.ime === e.target.value)
                    ?.mbr,
                })
              }
            >
              <option value="">Izaberite programera</option>
              {programeri?.map((opt, index) => (
                <option key={opt.mbr} value={opt?.ime}>
                  {opt?.ime}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full gap-3">
            <label>Datum:</label>
            <select
              className="shadow-xl shadow-[#1c263c] text-[#b6c0d2] p-1 bg-[#313c53] border-[#9cff00] border-2 rounded-lg"
              id="dan"
              onChange={(e) =>
                setRezervacija({ ...rezervacija, dan: e.target.value })
              }
              value={rezervacija.dan}
              disabled={rezervacija.ime === ""}
            >
              <option value="">Izaberite datum</option>
              {pocetniData?.map((opt, index) => (
                <option key={index} value={opt.dan}>
                  {opt?.dan}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full gap-3">
            <label>Jelo:</label>
            <select
              className="shadow-xl shadow-[#1c263c] text-[#b6c0d2] p-1 bg-[#313c53] border-[#9cff00] border-2 rounded-lg"
              id="jelo"
              name="jelo"
              value={rezervacija.jelo}
              disabled={rezervacija.dan === ""}
              onChange={(e) =>
                setRezervacija({ ...rezervacija, jelo: e.target.value })
              }
            >
              <option value="">Izaberite jelo</option>
              {obrociZaDan?.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full gap-3">
            <label>Vreme:</label>
            <select
              className="shadow-xl shadow-[#1c263c] text-[#b6c0d2] p-1 bg-[#313c53] border-[#9cff00] border-2 rounded-lg"
              id="vreme"
              name="vreme"
              value={rezervacija.vreme}
              disabled={rezervacija.jelo === ""}
              onChange={(e) =>
                setRezervacija({ ...rezervacija, vreme: e.target.value })
              }
            >
              <option value="">Izaberite vreme</option>
              {vremena.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mt-10 w-full gap-3">
            <label>Trepezarija:</label>
            <select
              className="shadow-xl shadow-[#1c263c] text-[#b6c0d2] p-1 bg-[#313c53] border-[#9cff00] border-2 rounded-lg"
              id="trpezarija"
              name="trpezarija"
              value={trpezarija.email}
              onChange={(e) => setTrpezarija({ email: e.target.value })}
            >
              {trpezarije.map((opt, index) => (
                <option key={index} value={opt.mail}>
                  {opt.ime}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="shadow-xl shadow-[#1c263c] bg-[#9cff00] text-[#1c263c] hover:bg-[#313c53] border-2 border-[#1c263c] hover:border-[#9cff00] hover:text-[#9cff00] transition-all duration-300 font-bold py-2 px-4 rounded-lg mt-10"
            onClick={unesiRezervaciju}
          >
            Dodaj
          </button>
        </form>
        <div className="flex flex-col text-xl">
          <table
            style={{
              border: "2px solid #b6c0d2",
              borderRadius: "var(--rounded-btn,0.5rem)",
              overflow: "hidden",
            }}
            className="shadow-xl shadow-[#1c263c] w-full table-fixed  mt-[40px]"
          >
            <thead>
              <tr className="bg-[#313c53]">
                <th className="p-2 w-[35%] text-center text-[#b6c0d2] font-bold uppercase border-r border-[#b6c0d2]">
                  Ime i prezime
                </th>
                <th className="p-2 w-[15%] text-center text-[#b6c0d2] font-bold uppercase border-r border-[#b6c0d2]">
                  Mbr
                </th>
                <th className="p-2 w-[30%] text-center text-[#b6c0d2] font-bold uppercase border-r border-[#b6c0d2]">
                  Jelo
                </th>
                <th className="p-2 w-[30%] text-center text-[#b6c0d2] font-bold uppercase border-r border-[#b6c0d2]">
                  Datum
                </th>
                <th className="p-2 w-[20%] text-center text-[#b6c0d2] font-bold uppercase">
                  Vreme
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#1c263c] text-[#9cff00] font-bold text-center text-md ">
              {rezervacije?.map((item, index) => {
                console.log(item);
                return (
                  <tr key={index}>
                    <td className="py-4 px-6 border border-[#b6c0d2]">
                      {item.ime}
                    </td>
                    <td className="py-4 px-6 border border-[#b6c0d2]">
                      {item.mbr}
                    </td>
                    <td className="py-4 px-6 border border-[#b6c0d2]">
                      {item.jelo}
                    </td>
                    <td className="py-4 px-6 border border-[#b6c0d2]">
                      {item.dan}
                    </td>
                    <td className="py-4 px-6 border border-[#b6c0d2]">
                      {item.vreme}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center">
            <button
              onClick={posaljiRezervaciju}
              className="shadow-xl shadow-[#1c263c] bg-[#9cff00] border-2 border-[#1c263c] w-1/4 hover:border-[#9cff00] text-[#1c263c] font-bold py-2 px-4 rounded-lg mt-10 transition ease-in hover:-translate-y-1 hover:scale-105 hover:bg-[#313c53] hover:text-[#9cff00] duration-300"
            >
              POŠALJI REZERVACIJU
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
