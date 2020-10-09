import { IRootCluster, toDot } from 'ts-graphviz';
import tmp from 'tmp-promise';
import { close, writeFile, execFile } from './utils';
import { ExecuteOption } from './types';

/**
 * A low-level API for wrappers for dot commands provided by Graphviz.
 */
export async function executeDot(dot: IRootCluster | string, options: ExecuteOption = {}): Promise<Buffer> {
  const { fd, path, cleanup } = await tmp.file();
  try {
    const input = typeof dot === 'string' ? dot : toDot(dot);

    await writeFile(fd, input);
    await close(fd);

    const args: string[] = [];
    if (typeof options.format === 'string') {
      args.push(`-T${options.format}`);
    }
    if (typeof options.output === 'string') {
      args.push('-o', options.output);
    }
    args.push(path);

    const { stdout } = await execFile(options.dotCommand ?? 'dot', args, {
      encoding: 'buffer',
    });
    return stdout;
  } finally {
    await cleanup();
  }
}
