import { describe, expect, it } from 'vitest';
import { fixture as content } from './fixture';
import { missingSources } from '../src/core/hints';
import { createInitialState, type ItemRef } from '../src/core/state';

const fresh = () => createInitialState(content);
const item = (level: ItemRef['level']): ItemRef => ({ chain: 'fasteners', level });

describe('where to get it', () => {
  it('points at an open zone that still drops the missing resource', () => {
    const [missing] = missingSources(fresh(), content, 'workbench', 'workshop');
    expect(missing?.req).toMatchObject({ kind: 'resource', resource: 'wood' });
    expect(missing?.source).toMatchObject({ kind: 'zone', zone: { id: 'door' } });
  });

  it('skips cleared zones and says "none" when nothing open holds it', () => {
    const s = fresh();
    s.zones.door = { taken: ['door_1', 'door_2', 'door_3'] };
    expect(missingSources(s, content, 'workbench', 'workshop')[0]?.source).toEqual({ kind: 'none' });
  });

  it('suggests merging when lower levels on the table are enough', () => {
    const s = fresh();
    s.objects.workbench = { step: 1 };
    s.resources.wood = 3;
    s.board[0] = item(1);
    s.box[0] = item(1);
    expect(missingSources(s, content, 'workbench', 'workshop')).toEqual([
      { req: expect.objectContaining({ kind: 'item', level: 2 }), source: { kind: 'merge' } },
    ]);
  });

  it('lists nothing when the repair is affordable', () => {
    const s = fresh();
    s.resources.wood = 4;
    expect(missingSources(s, content, 'workbench', 'workshop')).toEqual([]);
  });
});
