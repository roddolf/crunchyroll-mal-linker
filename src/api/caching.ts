export interface CacheOptions {
  ttl: number;
  maxSize: number;
}

interface CacheEntry {
  value: string,
  size: number;
  date: number;
  timeout: number;
}

export class UrlCache {

  #options: CacheOptions;
  #cache: Record<string, CacheEntry>
  #size: number;

  constructor(options: CacheOptions) {
    this.#options = options;
    this.#cache = {};
    this.#size = 0;
  }


  add(key: string, value: string): void {
    // Create entry object
    const newEntry: CacheEntry = {
      value,
      size: key.length + value.length,
      date: Date.now(),
      timeout: -1,
    };

    // Validate entry size
    if (this.#options.maxSize < newEntry.size)
      throw new Error('Entry is too big');

    // Update size
    this.#size += newEntry.size;

    // Clean cache if max size
    let entries = Object.entries(this.#cache);
    while (
      entries.length &&
      this.#size > this.#options.maxSize
    ) {
      // Find oldest entry
      const olderEntry = entries.reduce((olderEntry, entry) => {
        if (entry[1].date < olderEntry[1].date) return entry;
        return olderEntry;
      }, ['null', newEntry]);

      // Delete oldest entry
      this.delete(olderEntry[0]);

      // Refresh entries
      entries = Object.entries(this.#cache);
    }

    // Add auto delete
    newEntry.timeout = setTimeout(() => {
      this.delete(key);
    }, this.#options.ttl);

    // Add entry
    this.#cache[key] = newEntry;
  }

  delete(key: string): void {
    // Get entry
    const entry = this.#cache[key];
    if (!entry) return;

    // Delete entry
    delete this.#cache[key];

    // Update size
    this.#size = this.#size -= entry.size;

    // Delete auto delete
    clearTimeout(entry.timeout);
  }

  get(key: string): string | undefined {
    const entry = this.#cache[key];
    if (!entry) return;

    // Refresh ttl
    entry.date = Date.now();
    clearTimeout(entry.timeout);
    entry.timeout = setTimeout(() => {
      this.delete(key);
    }, this.#options.ttl);

    // Return value
    return entry.value;
  }

}