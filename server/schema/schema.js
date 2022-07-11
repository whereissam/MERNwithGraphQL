// const { projects, clients } = require('../sampleData.js')

//Mongoose models
const Project = require('../models/Project')
const Client = require('../models/Client')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQN, GraphQLNonNull, GraphQLEnumType } = require('graphql')

//Project type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve (parent, args) {
        return clients.find(client => client.id === parent.clientId)
      }
    }
  })
})

//Client type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve (parent, args) {
        return Project.find()
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } }, //in order to get the specific parameter
      resolve (parent, args) {
        return Project.findById(args.id)
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve (parent, args) {
        return Client.find()
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } }, //in order to get the specific parameter
      resolve (parent, args) {
        return Client.findById(parent.clientId)
      },
    },
  },
})

//Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    //Add a client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve (parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone
        })

        return client.save()
      }
    },
    //Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve (parent, args) {
        return Client.findByIdAndRemove(args.id)
      }
    },
    //Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              'new': { value: 'Not started' },
              'progress': { value: 'In Progress' },
              'completed': { value: 'Completed' }
            },
            defaultValue: 'Not Started',
          }),

        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve (parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId
        })

        return project.save()
      }
    },

  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})