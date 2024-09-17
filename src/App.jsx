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

  const obrociZaDan =
    pocetniData?.find((item) => item.dan === rezervacija.dan)?.topli_obroci ||
    [];

  useEffect(() => {
    api()
      .get("/data")
      .then((res) => setPocetniData(res.data));
  }, []);

  console.log(pocetniData);

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
      .post("/posalji", rezervacije)
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
      <main className="flex min-h-screen py-28 px-10 flex-row gap-7 text-2xl bg-gradient-to-r from-slate-300 to-slate-500">
        <form
          //onSubmit={handleSubmit}
          className="flex flex-col min-w-[30%] gap-4 xl:text-2xl text-gray-900 font-semibold"
        >
          <div className="flex flex-col w-full gap-2">
            <label>Programeri:</label>
            <select
              className="text-gray-800 p-1"
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
              className="text-gray-800 p-1"
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
              className="text-gray-800 p-1"
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
              className="text-gray-800 p-1"
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

          <button
            type="button"
            className="bg-teal-400 text-gray-900 hover:bg-teal-600 border-2 border-lime-400 hover:border-white hover:text-white transition-all duration-300 font-bold py-2 px-4 rounded mt-10"
            onClick={unesiRezervaciju}
          >
            Ubaci
          </button>
        </form>
        <div className="flex flex-col text-xl">
          <table className="w-full table-fixed shadow-lg border-2">
            <thead>
              <tr className="bg-teal-400">
                <th className="p-2 w-[35%] text-center text-gray-700 font-bold uppercase border-r">
                  Ime i prezime
                </th>
                <th className="p-2 w-[15%] text-center text-gray-700 font-bold uppercase border-r">
                  Mbr
                </th>
                <th className="p-2 w-[30%] text-center text-gray-700 font-bold uppercase border-r">
                  Jelo
                </th>
                <th className="p-2 w-[30%] text-center text-gray-700 font-bold uppercase border-r">
                  Datum
                </th>
                <th className="p-2 w-[20%] text-center text-gray-700 font-bold uppercase">
                  Vreme
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 backdrop-blur-[3px] text-blue-950 font-bold text-center text-md ">
              {rezervacije?.map((item, index) => {
                console.log(item);
                return (
                  <tr key={index}>
                    <td className="py-4 px-6 border border-gray-300">
                      {item.ime}
                    </td>
                    <td className="py-4 px-6 border border-gray-300">
                      {item.mbr}
                    </td>
                    <td className="py-4 px-6 border border-gray-300">
                      {item.jelo}
                    </td>
                    <td className="py-4 px-6 border border-gray-300">
                      {item.dan}
                    </td>
                    <td className="py-4 px-6 border border-gray-300">
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
              className="bg-lime-400 border-2 border-transparent w-1/4 hover:border-lime-400 text-blue-950 font-bold py-2 px-4 rounded mt-10 transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 hover:text-lime-400 duration-300"
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
