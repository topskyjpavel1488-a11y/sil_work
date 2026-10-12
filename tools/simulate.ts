// npm run simulate — the bot plays the game to the end and prints the run and totals (spec 5.5).
import { config } from '../src/config';
import { content } from '../src/data/index';
import { runBot } from './bot';
import { totalDemand, totalSupply } from './content-check';
import { speedrunMinutes } from './playtime';

const sim = runBot(content);
sim.log.forEach((line, i) => console.log(`${String(i + 1).padStart(2)}. ${line}`));

const demand = totalDemand(content);
const supply = totalSupply(content);
const ratio = (s: number, d: number) => (d ? (s / d).toFixed(2) : '—');
console.log('');
console.log('            supply  demand  ratio');
for (const r of ['wood', 'metal', 'parts'] as const) {
  console.log(`  ${r.padEnd(8)}  ${String(supply.resources[r]).padStart(6)}  ${String(demand.resources[r]).padStart(6)}  ${ratio(supply.resources[r], demand.resources[r])}`);
}
console.log(`  ${'level1'.padEnd(8)}  ${String(supply.level1).padStart(6)}  ${String(demand.level1).padStart(6)}  ${ratio(supply.level1, demand.level1)}`);
console.log('');
console.log(`Peak board ${sim.maxBoard}/${config.boardCols * config.boardRows} (limit ${config.simMaxBoardCells}), peak box ${sim.maxBox}/${config.boxSize} (limit ${config.simMaxBoxCells})`);
console.log(`Actions: ${sim.actions}. Left over: W${sim.state.resources.wood} M${sim.state.resources.metal} P${sim.state.resources.parts}`);
console.log(sim.finished ? 'Finished: the workshop is restored.' : `NOT finished: stuck at ${sim.stuckAt}`);
const greedy = runBot(content, 'greedy');
console.log(
  greedy.finished
    ? `Merge-everything run: finished too (peak board ${greedy.maxBoard}/${config.boardCols * config.boardRows}, ${greedy.actions} actions).`
    : `Merge-everything run: NOT finished, stuck at ${greedy.stuckAt}`,
);
const speed = speedrunMinutes(content, sim);
console.log('');
console.log(`Fast playthrough estimate: ${speed.minutes.toFixed(1)} min (Yandex rule 2.9 wants more than 10)`);
console.log('  ' + Object.entries(speed.parts).map(([k, v]) => `${k} ${v.toFixed(0)}s`).join(', '));
console.log(`  actions: ${sim.counts.debris} debris, ${sim.counts.merges} merges, ${sim.counts.moves} moves, ${sim.counts.repairs} repairs`);
if (!sim.finished || !greedy.finished) process.exit(1);
