import React, { useState } from "react";

type ScenarioInput = {
  principal: number;
  annualRate: number;
  termMonths: number;
  buydownRate: number;
  buydownMonths: number;
};

export default function ScenarioPlanner() {
  const [input, setInput] = useState<ScenarioInput>({
    principal: 200000,
    annualRate: 5,
    termMonths: 360,
    buydownRate: 1,
    buydownMonths: 12,
  });
  const [schedule, setSchedule] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const calculate = async () => {
    try {
      const res = await fetch("/api/loan/calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      setSchedule(data);
    } catch (e) {
      console.error("Calculation failed", e);
    }
  };

  return (
    <div>
      <h2>Scenario Planner</h2>
      <div>
        <label>
          Principal
          <input
            name="principal"
            type="number"
            value={input.principal}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Rate (%)
          <input
            name="annualRate"
            type="number"
            value={input.annualRate}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Term (months)
          <input
            name="termMonths"
            type="number"
            value={input.termMonths}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Buydown Rate (%)
          <input
            name="buydownRate"
            type="number"
            value={input.buydownRate}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Buydown Months
          <input
            name="buydownMonths"
            type="number"
            value={input.buydownMonths}
            onChange={handleChange}
          />
        </label>
      </div>
      <button onClick={calculate}>Calculate</button>
      <pre>{JSON.stringify(schedule, null, 2)}</pre>
    </div>
  );
}
