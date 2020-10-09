import { IRootCluster } from 'ts-graphviz';
import { ExecuteOption } from './types';
import { executeDot } from './executeDot';

/**
 * Returns the Graphviz output result as a buffer.
 */
export async function exportToBuffer(dot: IRootCluster | string, options: ExecuteOption): Promise<Buffer> {
  return await executeDot(dot, options);
}
