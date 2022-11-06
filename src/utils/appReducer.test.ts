import { expect, it, describe } from "vitest"
import { Action, appReducer, State } from "./appReducer"

describe("App Reducer", () => {
    describe("CREATE_LIST", () => {
        it("should create a new todo list", () => {
            // Arrange
            const newListName = 'New created list'
            const action: Action = { type: "CREATE_LIST", payload: { newListName: newListName } }
            const state: State = []

            // Act
            const result = appReducer(state, action);

            // Assert
            expect(result).toHaveLength(1);
            expect(result[0]).toBeDefined();
            expect(result[0].name).toBe(newListName)
        })
        it("should not create a new todo list - empty name", () => {
            // Arrange
            const newListName = ''
            const action: Action = { type: "CREATE_LIST", payload: { newListName: newListName } }
            const state: State = []

            // Act
            const result = appReducer(state, action);

            // Assert
            expect(result).toHaveLength(0);
            expect(result[0]).not.toBeDefined();
        })
    })
    describe("REMOVE_LIST", () => {
        it("should remove the list", () => {
            // Arrange
            const listId = '1abc'
            const action: Action = { type: "REMOVE_LIST", payload: { listId } }
            const state: State = [{ id: '1abc', name: 'remove test', tasks: [] }]

            // Act
            const result = appReducer(state, action);

            // Assert
            expect(result).toHaveLength(0);
            expect(result[0]).not.toBeDefined();
        })
        it("should not remove the list - id not found", () => {
            // Arrange
            const listId = '2abc'
            const action: Action = { type: "REMOVE_LIST", payload: { listId } }
            const state: State = [{ id: '1abc', name: 'remove test', tasks: [] }]

            // Act
            const result = appReducer(state, action);

            // Assert
            expect(result).toHaveLength(1);
            expect(result[0]).toBeDefined();
            expect(result[0].id).toBe('1abc');
        })
    })
    describe("UPDATE_LIST", () => {
        it("should update the list", () => {
            // Arrange
            const listId = '1abc';
            const newListName = 'new list name'
            const action: Action = { type: "UPDATE_LIST", payload: { listId, newListName } }
            const state: State = [{ id: '1abc', name: 'list name', tasks: [] }]

            // Act
            const result = appReducer(state, action)

            // Assert
            expect(result).toHaveLength(1);
            expect(result[0]).toBeDefined();
            expect(result[0].id).toBe(listId);
            expect(result[0].name).toBe(newListName);
        })
        it("should not update the list - id not found", () => {
            // Arrange
            const listId = '2abc';
            const newListName = 'new list name'
            const action: Action = { type: "UPDATE_LIST", payload: { listId, newListName } }
            const state: State = [{ id: '1abc', name: 'list name', tasks: [] }]

            // Act
            const result = appReducer(state, action)

            // Assert
            expect(result).toHaveLength(1);
            expect(result[0]).toBeDefined();
            expect(result[0].id).toBe(state.find(item => item.id !== listId)?.id);
            expect(result[0].name).toBe(state.find(item => item.id !== listId)?.name);
        })
        it("should not update the list - empty name", () => {
            // Arrange
            const listId = '1abc';
            const newListName = '';
            const action: Action = { type: "UPDATE_LIST", payload: { listId, newListName } }
            const state: State = [{ id: '1abc', name: 'list name', tasks: [] }]

            // Act
            const result = appReducer(state, action)

            // Assert
            expect(result).toHaveLength(1);
            expect(result[0]).toBeDefined();
            expect(result[0].id).toBe(listId);
            expect(result[0].name).not.toBe(newListName);
        })
        describe("ADD_TASK", () => {
            it("should create task", () => {
                // Arrange
                const listId = '1abc';
                const newTaskName = 'new task name';
                const action: Action = { type: "ADD_TASK", payload: { listId, newTaskName } }
                const state: State = [{ id: '1abc', name: 'list name', tasks: [] }]

                // Act
                const result = appReducer(state, action);

                // Assert
                expect(result[0].tasks).toHaveLength(1);
                expect(result[0].tasks).toBeDefined();
                expect(result[0].tasks[0].name).toBe(newTaskName);
            })
            it("should not create task - id not found", () => {
                // Arrange
                const listId = '2abc';
                const newTaskName = 'new task name';
                const action: Action = { type: "ADD_TASK", payload: { listId, newTaskName } }
                const state: State = [{ id: '1abc', name: 'list name', tasks: [] }]

                // Act
                const result = appReducer(state, action);

                // Assert
                expect(result[0].tasks).toHaveLength(0);
            })
            it("should not create task - empty name", () => {
                // Arrange
                const listId = '1abc';
                const newTaskName = '';
                const action: Action = { type: "ADD_TASK", payload: { listId, newTaskName } }
                const state: State = [{ id: '1abc', name: 'list name', tasks: [] }]

                // Act
                const result = appReducer(state, action);

                // Assert
                expect(result[0].tasks).toHaveLength(0);
            })
        })
        describe("REMOVE_TASK", () => {
            it("should delete the task", () => {
                // Arrange
                const listId = '1abc'
                const taskId = '1bcd'
                const action: Action = { type: "REMOVE_TASK", payload: { listId, taskId } }
                const state: State = [{ id: '1abc', name: 'list name', tasks: [{ id: '1bcd', name: 'task name' }] }]

                // Act
                const result = appReducer(state, action);

                // Assert
                expect(result[0].tasks).toHaveLength(0);
            })
            it("should not delete the task - task id not found", () => {
                // Arrange
                const listId = '1abc'
                const taskId = '2bcd'
                const action: Action = { type: "REMOVE_TASK", payload: { listId, taskId } }
                const state: State = [{ id: '1abc', name: 'list name', tasks: [{ id: '1bcd', name: 'task name' }] }]

                // Act
                const result = appReducer(state, action);

                // Assert
                expect(result[0].tasks).toHaveLength(1);
                expect(result[0].tasks).toBeDefined();
                expect(result[0].tasks[0].name).toBe(state.find(list => list.id === listId)?.tasks.find(item => item.id !== taskId)?.name);
                expect(result[0].tasks[0].id).toBe(state.find(list => list.id === listId)?.tasks.find(item => item.id !== taskId)?.id);
            })
        })
        describe("UPDATE TASK", () => {
            it("should update the task", () => {
                // Arrange
                const listId = '1abc';
                const taskId = '1bcd';
                const newTaskName = 'new task name';
                const action: Action = { type: "UPDATE_TASK", payload: { listId, taskId, newTaskName } };
                const state: State = [{ id: '1abc', name: 'list name', tasks: [{ id: '1bcd', name: 'task name' }] }]

                // Act
                const result = appReducer(state, action);

                expect(result[0].tasks).toHaveLength(1);
                expect(result[0].tasks[0].name).toBe(newTaskName);
            })
            it("should not update the task - id not found", () => {
                // Arrange
                const listId = '1abc';
                const taskId = '2bcd';
                const newTaskName = 'new task name';
                const action: Action = { type: "UPDATE_TASK", payload: { listId, taskId, newTaskName } };
                const state: State = [{ id: '1abc', name: 'list name', tasks: [{ id: '1bcd', name: 'task name' }] }]

                // Act
                const result = appReducer(state, action);

                expect(result[0].tasks).toHaveLength(1);
                expect(result[0].tasks[0].name).not.toBe(newTaskName);
            })
            it("should not update the task - empty name", () => {
                // Arrange
                const listId = '1abc';
                const taskId = '1bcd';
                const newTaskName = '';
                const action: Action = { type: "UPDATE_TASK", payload: { listId, taskId, newTaskName } };
                const state: State = [{ id: '1abc', name: 'list name', tasks: [{ id: '1bcd', name: 'task name' }] }]

                // Act
                const result = appReducer(state, action);

                expect(result[0].tasks).toHaveLength(1);
                expect(result[0].tasks[0].name).toBe(state.find(list => list.id === listId)?.tasks.find(task => task.id === taskId)?.name);
            })
        })
    })
    describe("MOVE_TASK", () => {
        it("should move the task", () => {
            // Arrange
            const taskId = '1bcd';
            const originListId = '1abc';
            const targetListId = '2abc';
            const action: Action = { type: "MOVE_TASK", payload: { taskId, originListId, targetListId } };
            const state: State = [{ id: '1abc', name: 'first list', tasks: [{ id: '1bcd', name: 'task name' }] }, { id: '2abc', name: 'second list', tasks: [] }]

            // Act
            const result = appReducer(state, action);

            // Assert;
            expect(result[0].tasks).toHaveLength(0);
            expect(result[1].tasks).toHaveLength(1);
        })
        it("should not move the task - task id not found", () => {
            // Arrange
            const taskId = '2bcd';
            const originListId = '1abc';
            const targetListId = '2abc';
            const action: Action = { type: "MOVE_TASK", payload: { taskId, originListId, targetListId } };
            const state: State = [{ id: '1abc', name: 'first list', tasks: [{ id: '1bcd', name: 'task name' }] }, { id: '2abc', name: 'second list', tasks: [] }]

            // Act
            const result = appReducer(state, action);

            // Assert;
            expect(result[0].tasks).toHaveLength(1);
            expect(result[1].tasks).toHaveLength(0);
        })
    })
    it("should be true", () => {
        expect(true).toBeTruthy()
    })
})