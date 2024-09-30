import { useState } from "react";
import cheats from "./cheats.json"; // Import your cheats JSON file

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const filteredCheats = Object.entries(cheats.cheats).flatMap(
        ([category, commands]) => {
            if (!Array.isArray(commands)) {
                console.error(
                    `Commands for category ${category} is not an array:`,
                    commands
                );
                return [];
            }

            return commands
                .filter((command) => {
                    const matchesSearchTerm = command.cheat
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                    const matchesCategory = categoryFilter
                        ? category === categoryFilter
                        : true;
                    return matchesSearchTerm && matchesCategory;
                })
                .map((command) => ({ ...command, category }));
        }
    );

    return (
        <div className="container">
            <h1 className="main__title">Sims 4 Cheats</h1>
            <section className="search__container">
                <input
                    type="text"
                    placeholder="Search for a cheat..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search__input"
                />
                <select
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="search__select"
                >
                    <option value="">All Categories</option>
                    <option value="Money Cheats">Money Cheats</option>
                    <option value="Career and School Cheats">
                        Career and School Cheats
                    </option>
                    <option value="Skill and Aspiration Cheats">
                        Skill and Aspiration Cheats
                    </option>
                    <option value="Relationship Cheats">
                        Relationship Cheats
                    </option>
                    <option value="Build and Buy Cheats">
                        Build and Buy Cheats
                    </option>
                    <option value="Death Cheats">Death Cheats</option>
                    <option value="Shift + Click Cheats">
                        Shift + Click Cheats
                    </option>
                    <option value="Shift + Click on Object Cheats">
                        Shift + Click on Object Cheats
                    </option>
                </select>
            </section>
            <section className="cheats__container">
                <ul className="cheats__list">
                    {filteredCheats.map((cheat) => (
                        <li
                            key={`${cheat.category}-${cheat.cheat}`}
                            className="cheat__card"
                        >
                            <h2 className="cheat__title">{cheat.cheat}</h2>
                            <p className="cheat__effect">{cheat.effect}</p>
                            <p className="cheat__category">{cheat.category}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default App;
