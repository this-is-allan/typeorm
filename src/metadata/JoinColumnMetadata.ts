import {PropertyMetadata} from "./PropertyMetadata";
import {JoinColumnOptions} from "./options/JoinColumnOptions";
import {NamingStrategyInterface} from "../naming-strategy/NamingStrategyInterface";
import {RelationMetadata} from "./RelationMetadata";
import {ColumnMetadata} from "./ColumnMetadata";

/**
 */
export class JoinColumnMetadata extends PropertyMetadata {

    // ---------------------------------------------------------------------
    // Public Properties
    // ---------------------------------------------------------------------

    /**
     * Relation - owner of this join column metadata.
     */
    relation: RelationMetadata;

    // ---------------------------------------------------------------------
    // Readonly Properties
    // ---------------------------------------------------------------------

    /**
     * Join column name.
     */
    private readonly _name: string;
    
    /**
     * Join column referenced column name.
     */
    private readonly _referencedColumnName: string;

    // ---------------------------------------------------------------------
    // Constructor
    // ---------------------------------------------------------------------

    constructor(target: Function, 
                propertyName: string, 
                options: JoinColumnOptions) {
        super(target, propertyName);
        
        if (options.name)
            this._name = options.name;
        if (options.referencedColumnName)
            this._referencedColumnName = options.referencedColumnName;
    }

    // ---------------------------------------------------------------------
    // Accessors
    // ---------------------------------------------------------------------

    /**
     * Join column name.
     */
    get name() {
        return this.relation.entityMetadata.namingStrategy.joinColumnInverseSideName(this._name, this.relation.propertyName);
    }

    /**
     * Referenced join column.
     */
    get referencedColumn(): ColumnMetadata {
        if (this._referencedColumnName)
            return this.relation.inverseEntityMetadata.columns.find(column => column.name === this._referencedColumnName);

        return this.relation.inverseEntityMetadata.primaryColumn;
    }
    
}