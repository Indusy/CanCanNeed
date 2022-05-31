import SparkMD5 from 'spark-md5'

export class Scheduler {
  #maxRunningTaskNumber
  #waitingList = []
  #currentRunningCount = 0
  constructor (maxRunningTaskNumber) {
    this.#maxRunningTaskNumber = maxRunningTaskNumber
  }

  async add (task) {
    if (this.#currentRunningCount < this.#maxRunningTaskNumber) {
      this.#currentRunningCount++
      await task()
      this.#currentRunningCount--
      this.invokeNext()
    } else {
      this.#waitingList.push(task)
    }
  }

  async invokeNext () {
    if (this.#waitingList.length && this.#currentRunningCount < this.#maxRunningTaskNumber) {
      this.#currentRunningCount++
      await this.#waitingList.shift()()
      this.#currentRunningCount--
      this.invokeNext()
    }
  }
}

export async function * genSlice (file, chunkSize = 1024 * 1024 * 2) {
  const [fname, fext] = file.name.split('.')
  let count = 0
  let offset = 0
  const fileSize = file.size
  const chunkCount = Math.ceil(fileSize / chunkSize)
  const fhash = hashChunk(await file.arrayBuffer())
  const _slice = () => {
    const endOffset = Math.min(fileSize, offset + chunkSize)
    const chunk = file.slice(offset, endOffset)
    offset = endOffset
    return chunk
  }
  while (count <= chunkCount) {
    const chunk = _slice()
    const hash = hashChunk(await chunk.arrayBuffer())
    if (count < chunkCount) {
      yield {
        chunk,
        hash,
        fname,
        fext,
        fhash
      }
    } else {
      return {
        chunk,
        hash,
        fname,
        fext,
        fhash
      }
    }
    count++
  }
}

export function hashChunk (chunk) {
  const spark = new SparkMD5.ArrayBuffer()
  spark.append(chunk)
  return spark.end()
}
