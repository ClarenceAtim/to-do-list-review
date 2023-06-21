class Data {
  constructor(index, description, completed) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }

  updateStatus(completed) {
    this.completed = completed;
  }
}

export default Data;